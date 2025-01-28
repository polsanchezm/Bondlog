import 'server-only'

import { cookies } from 'next/headers'
import { decrypt } from '@lib/session'
import { cache } from 'react'
import { redirect } from 'next/navigation'
import { fetchUserData } from '@/actions/user'

export const verifySession = cache(async () => {
    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)

    if (!session?.token) {
        redirect('/login')
    }

    return { isAuth: true, userId: session.token }
})


export const getUser = cache(async () => {
    const session = await verifySession()
    if (!session) return null

    try {
        const response = await fetchUserData();

        const userId = response
        console.log('userId', userId);

        return userId
    } catch (error) {
        console.log('Failed to fetch user')
        return null
    }
})