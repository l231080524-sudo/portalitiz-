alter table public.alumnos enable row level security;

grant select, update on table public.alumnos to authenticated;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'alumnos'
      AND policyname = 'alumnos_select_own'
  ) THEN
    CREATE POLICY alumnos_select_own
      ON public.alumnos
      FOR SELECT
      TO authenticated
      USING (auth.uid() = id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'alumnos'
      AND policyname = 'alumnos_update_own'
  ) THEN
    CREATE POLICY alumnos_update_own
      ON public.alumnos
      FOR UPDATE
      TO authenticated
      USING (auth.uid() = id)
      WITH CHECK (auth.uid() = id);
  END IF;
END
$$;

grant select on table public.carreras to anon, authenticated;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'carreras'
      AND policyname = 'carreras_public_read'
  ) THEN
    CREATE POLICY carreras_public_read
      ON public.carreras
      FOR SELECT
      TO anon, authenticated
      USING (true);
  END IF;
END
$$;

CREATE OR REPLACE FUNCTION public.handle_new_alumno()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.alumnos (
    id,
    matricula,
    nombre,
    apellido_paterno,
    apellido_materno,
    correo,
    carrera_id,
    semestre_actual
  )
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'matricula',
    NEW.raw_user_meta_data ->> 'nombre',
    NEW.raw_user_meta_data ->> 'apellido_paterno',
    NEW.raw_user_meta_data ->> 'apellido_materno',
    NEW.email,
    NULLIF(NEW.raw_user_meta_data ->> 'carrera_id', '')::bigint,
    NULLIF(NEW.raw_user_meta_data ->> 'semestre_actual', '')::integer
  );

  RETURN NEW;
END;
$$;

drop trigger if exists on_auth_user_created_alumno on auth.users;

CREATE TRIGGER on_auth_user_created_alumno
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_alumno();

CREATE OR REPLACE FUNCTION public.get_auth_email_by_matricula(p_matricula text)
RETURNS text
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT correo
  FROM public.alumnos
  WHERE matricula = trim(p_matricula)
  LIMIT 1;
$$;

grant execute on function public.get_auth_email_by_matricula(text) to anon, authenticated;

