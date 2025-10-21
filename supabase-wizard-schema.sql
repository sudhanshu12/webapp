-- Create wizard_data table for storing user wizard data
CREATE TABLE IF NOT EXISTS wizard_data (
  id SERIAL PRIMARY KEY,
  user_email VARCHAR(255) UNIQUE NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_email for faster lookups
CREATE INDEX IF NOT EXISTS idx_wizard_data_user_email ON wizard_data(user_email);

-- Create index on updated_at for sorting
CREATE INDEX IF NOT EXISTS idx_wizard_data_updated_at ON wizard_data(updated_at);

-- Enable Row Level Security (RLS)
ALTER TABLE wizard_data ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to only access their own data
CREATE POLICY "Users can only access their own wizard data" ON wizard_data
  FOR ALL USING (user_email = current_setting('request.jwt.claims', true)::json->>'email');

-- Create policy for service role (for API access)
CREATE POLICY "Service role can access all wizard data" ON wizard_data
  FOR ALL USING (auth.role() = 'service_role');

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_wizard_data_updated_at
  BEFORE UPDATE ON wizard_data
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
