import React from 'react'
import { fetchOrders } from '../../../store/adminside/adminSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { formatCurrency } from '../../../utils/formatCurrency'
import Loading from '../../../utils/loading/Loading'
import toast from 'react-hot-toast'
import { Box } from "lucide-react";

export default function Orders() {
  const dispatch = useDispatch()
  const { orders, loading, error } = useSelector((state) => state.admin)

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])

  if(loading) {
    return <Loading />
  }

  if(error) {
    toast.error(error)
  }

  return (
    <div className='mt-8'>
      <h2 className="text-lg md:text-xl font-semibold mb-4"><Box className="inline-block bg-orange-100 text-orange-400 rounded-md p-2 size-10" /> All Orders</h2>
      <div className="overflow-x-auto border-gray-100 border-1 shadow rounded-lg bg-white">
        <table className="w-full">
          <thead className="h-10 px-4">
            <tr className="text-left">
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Customer Name</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map(order => (
                <tr key={order.id} className="text-left capitalize font-medium">
                  <td className="px-4 py-2">
                    <img src={order.orderItems?.[0]?.product?.image} alt={order.orderItems?.[0]?.product?.productName} className='w-8 h-8 object-cover rounded-sm'/>
                  </td>
                  <td className="px-4 py-2">#{order.id}</td>
                  <td className="px-4 py-2">{order.user.fullName}</td>
                  <td className="px-4 py-2">{formatCurrency(order.total, "ETB", "en-ET")}</td>
                  <td className={`px-4 rounded-2xl ${order.status === "PAID" ? "text-green-500 bg-green-100 " : "text-red-500 "}`}>{order.status}</td>
                  <td className="px-4 py-2">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-2 text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
