import { useState, useEffect } from 'react'
import { Customer } from '../components/pages/Admin/Customer/CustomerData'

export function useAdminUsers() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')

    fetch(`${process.env.REACT_APP_API_URL}/users`, {
      headers: { Authorization : `Bearer ${token}` }
    })
    .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users")
        return res.json()})
    .then((data) => {
        const mapped: Customer[] = data.data.map((u: any) => ({ 
            id:      u.id,         
            name:    u.userName,   
            email:   u.email,
            phone:   u.phoneNumber ?? "—",
            since:   u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—",
            orders:  u.totalOrders ?? 0,
            revenue: u.totalRevenue ? `$${u.totalRevenue.toFixed(2)}` : "$0.00",
            status:  u.role === 1 ? "Active" : "Inactive" as "Active" | "Inactive",
            avatar:  u.userName?.slice(0, 2).toUpperCase() ?? "??",
            role:    u.role,
            image:   u.image ?? "",
        }))
        setCustomers(mapped)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return { customers, loading, error }
}