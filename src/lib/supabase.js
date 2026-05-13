// @ts-nocheck
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    '[Supabase] Configuração incompleta. Defina VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY no .env'
  )
}

export const supabase = createClient(
  supabaseUrl || 'http://localhost:54321',
  supabaseKey || 'placeholder-key'
)