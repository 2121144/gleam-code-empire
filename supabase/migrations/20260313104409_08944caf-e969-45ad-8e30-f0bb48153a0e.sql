
-- Allow inserting admin role only when no admin exists yet (first-time setup)
CREATE POLICY "Allow first admin setup"
ON public.user_roles FOR INSERT TO authenticated
WITH CHECK (
  role = 'admin' AND
  user_id = auth.uid() AND
  NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin')
);
