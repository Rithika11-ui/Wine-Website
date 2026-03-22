import { useEffect, useState } from "react"  

interface Reward {
  id: number
  code: string
  description: string
  discount: string
  discountType: DiscountType
  minOrder: string
  usageLimit: number
  usedCount: number
  status: Status
  expiryDate: string
}

type Status = 'Active' | 'Inactive' | 'Expired'
type DiscountType = 'Percentage' | 'Fixed'

const INITIAL_REWARDS: Reward[] = [] 

const EMPTY_FORM = {
  code: '',
  description: '',
  discount: '',
  discountType: 'Percentage' as DiscountType,
  minOrder: '0',
  usageLimit: 100,
  status: 'Active' as Status,
  expiryDate: '',
}

export function useAdminReward() {
  const [rewards, setRewards]           = useState<Reward[]>(INITIAL_REWARDS)
  const [search, setSearch]             = useState('')
  const [loading, setLoading]           = useState(true)
  const [error, setError]               = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<Status | 'All'>('All')
  const [modalOpen, setModalOpen]       = useState(false)
  const [editTarget, setEditTarget]     = useState<Reward | null>(null)
  const [form, setForm]                 = useState(EMPTY_FORM)
  const [deleteId, setDeleteId]         = useState<number | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    fetch(`${process.env.REACT_APP_API_URL}/rewards`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch Rewards.")
        return res.json()
      })
      .then((data) => {
        const mapped: Reward[] = data.data.map((r: any) => ({
          id:           r.id,
          code:         r.code,
          description:  r.description,
          discount:     String(r.discount),
          discountType: r.discountType === 1 ? 'Percentage' : 'Fixed' as DiscountType,
          minOrder:     String(r.minOrder ?? '0'),
          usageLimit:   r.usageLimit ?? 0,
          usedCount:    r.usedCount ?? 0,
          status:       r.status === 1 ? 'Active' : r.status === 2 ? 'Inactive' : 'Expired' as Status,
          expiryDate:   r.expiryDate ? new Date(r.expiryDate).toLocaleDateString() : '—',
        }))
        setRewards(mapped)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const filter = () =>
    rewards.filter((r: Reward) => {
      const matchSearch =
        r.code.toLowerCase().includes(search.toLowerCase()) ||
        r.description.toLowerCase().includes(search.toLowerCase())
      const matchStatus = filterStatus === "All" || r.status === filterStatus
      return matchSearch && matchStatus
    })

  const openAdd = () => {
    setEditTarget(null)
    setForm(EMPTY_FORM)
    setModalOpen(true)
  }

  const openEdit = (r: Reward) => {
    setEditTarget(r)
    setForm({
      code:         r.code,
      description:  r.description,
      discount:     r.discount,
      discountType: r.discountType,
      minOrder:     r.minOrder,
      usageLimit:   r.usageLimit,
      status:       r.status,
      expiryDate:   r.expiryDate,
    })
    setModalOpen(true)
  }

  const closeModal = () => {
    setEditTarget(null)
    setModalOpen(false)
  }

  const handleSave = () => {
    if (!form.code.trim() || !form.discount.trim()) return
    if (editTarget) {
      setRewards((prev: Reward[]) =>
        prev.map((r: Reward) => (r.id === editTarget.id ? { ...r, ...form } : r))
      )
    } else {
      setRewards((prev: Reward[]) => [...prev, { id: Date.now(), ...form, usedCount: 0 }])
    }
    closeModal()
  }

  const handleDelete = (id: number) => {
    setRewards((prev: Reward[]) => prev.filter((r: Reward) => r.id !== id))
    setDeleteId(null)
  }

  const totalUsed   = rewards.reduce((s: number, r: Reward) => s + r.usedCount, 0)
  const activeCount = rewards.filter((r: Reward) => r.status === "Active").length

  return {
    rewards,
    search,        setSearch,
    loading,
    error,
    filterStatus,  setFilterStatus,
    modalOpen,
    editTarget,
    form,          setForm,
    deleteId,      setDeleteId,
    filter,
    openAdd,
    openEdit,
    closeModal,
    handleSave,
    handleDelete,
    totalUsed,
    activeCount,
  }
}