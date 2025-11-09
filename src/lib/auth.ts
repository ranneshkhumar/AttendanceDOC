import { supabase, isSupabaseConfigured } from './supabase'
import { User } from '../types'

export const signUp = async (
  name: string,
  rollNumber: string,
  email: string,
  password: string
): Promise<{ user: User | null; error: string | null }> => {
  if (!isSupabaseConfigured() || !supabase) {
    return { user: null, error: 'Supabase is not configured. Please set up your .env file with Supabase credentials.' }
  }

  try {
    // Sign up with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) {
      return { user: null, error: authError.message }
    }

    if (!authData.user) {
      return { user: null, error: 'Failed to create user' }
    }

    // Create user record in users table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        name,
        roll_number: rollNumber,
        email,
        year: null,
      })
      .select()
      .single()

    if (userError) {
      return { user: null, error: userError.message }
    }

    return {
      user: {
        id: userData.id,
        name: userData.name,
        roll_number: userData.roll_number,
        email: userData.email,
        year: userData.year,
      },
      error: null,
    }
  } catch (error) {
    return { user: null, error: 'An unexpected error occurred' }
  }
}

export const signIn = async (
  email: string,
  password: string
): Promise<{ user: User | null; error: string | null }> => {
  if (!isSupabaseConfigured() || !supabase) {
    return { user: null, error: 'Supabase is not configured. Please set up your .env file with Supabase credentials.' }
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { user: null, error: error.message }
    }

    if (!data.user) {
      return { user: null, error: 'Failed to sign in' }
    }

    // Fetch user data from users table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single()

    if (userError) {
      return { user: null, error: userError.message }
    }

    return {
      user: {
        id: userData.id,
        name: userData.name,
        roll_number: userData.roll_number,
        email: userData.email,
        year: userData.year,
      },
      error: null,
    }
  } catch (error) {
    return { user: null, error: 'An unexpected error occurred' }
  }
}

export const updateUserYear = async (
  userId: string,
  year: number
): Promise<{ error: string | null }> => {
  if (!isSupabaseConfigured() || !supabase) {
    return { error: 'Supabase is not configured. Year will be stored locally only.' }
  }

  try {
    const { error } = await supabase
      .from('users')
      .update({ year })
      .eq('id', userId)

    if (error) {
      return { error: error.message }
    }

    return { error: null }
  } catch (error) {
    return { error: 'An unexpected error occurred' }
  }
}

