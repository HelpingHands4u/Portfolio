CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT contact_submissions_name_length CHECK (char_length(btrim(name)) BETWEEN 1 AND 100),
  CONSTRAINT contact_submissions_email_length CHECK (char_length(btrim(email)) BETWEEN 3 AND 254),
  CONSTRAINT contact_submissions_message_length CHECK (char_length(btrim(message)) BETWEEN 10 AND 3000)
);
GRANT INSERT ON public.contact_submissions TO anon;
GRANT ALL ON public.contact_submissions TO service_role;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors can submit valid contact messages"
  ON public.contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (
    char_length(btrim(name)) BETWEEN 1 AND 100
    AND char_length(btrim(email)) BETWEEN 3 AND 254
    AND position('@' IN btrim(email)) > 1
    AND char_length(btrim(message)) BETWEEN 10 AND 3000
  );