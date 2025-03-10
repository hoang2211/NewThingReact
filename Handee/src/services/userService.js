import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'
import { signIn } from 'next-auth/react'

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL

export const CreateUser = async (userData) => {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
  return res
}

export const LoginUser = async (email, password) => {
  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result.error) {
      throw new Error(result.error)
    }
  } catch (error) {
    throw new Error(error.message || 'An unexpected error occurred.')
  }
}

export function GetAllUser() {
  const { data, error, isLoading, mutate } = useSWR(
    `${API_URL}/api/user/getAll`,
    fetcher,
  )
  return { userData: data, isLoading, isError: error, mutate }
}

export function GetUserById(id) {
  const { data, error, isLoading } = useSWR(
    `${API_URL}/api/user/getById/${id}`,
    fetcher,
  )
  return { userData: data, isLoading, isError: error }
}

export const DeleteUser = async (id) => {
  try {
    await fetch(`${API_URL}/api/user/${id}`, {
      method: 'DELETE',
    })
  } catch (err) {
    console.error('Error deleting user:', err)
    throw err
  }
}

export async function UpdateUser(userId, updateData) {
  try {
    const response = await fetch(`${API_URL}/api/user/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })
    const data = await response.json()
    return { ok: response.ok, data }
  } catch (error) {
    console.error('Error in UpdateUser:', error)
    return { ok: false, error }
  }
}

export const changePassword = async (userId, currentPassword, newPassword) => {
  try {
    const res = await fetch(`${API_URL}/api/user/changePassword/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    })

    if (!res.ok) {
      throw new Error(await res.text())
    }
    return res.json()
  } catch (error) {
    console.error('Error changing password:', error)
    throw error
  }
}
