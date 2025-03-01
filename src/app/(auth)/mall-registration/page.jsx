import Link from 'next/link'

import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/common/Button'
import { SelectField, TextField } from '@/components/common/Fields'

export const metadata = {
  title: 'Seller Sign Up',
}

export default function SellerRegister() {
  return (
    <AuthLayout
      title="Sign up as a Seller"
      subtitle={
        <>
          <div>🚀 Expanding to Become a Global Brand</div>
          <div>🛍️ Empowering Sellers, Elevating Shopping Experiences</div>
          <div>📈 Your Business, Our Priority</div>
        </>
      }
    >
      <form>
        <div className="grid grid-cols-2 gap-6">
          <TextField
            label="Store Name"
            name="store_name"
            type="text"
            autoComplete="organization"
            required
          />
          <TextField
            label="Owner Name"
            name="owner_name"
            type="text"
            autoComplete="name"
            required
          />
          <TextField
            className="col-span-full"
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <TextField
            className="col-span-full"
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
          />
          <TextField
            className="col-span-full"
            label="Store Address"
            name="store_address"
            type="text"
            autoComplete="address-line1"
            required
          />
          <TextField
            className="col-span-full"
            label="Phone Number"
            name="phone_number"
            type="tel"
            autoComplete="tel"
            required
          />
          <SelectField
            className="col-span-full"
            label="Business Category"
            name="business_category"
            required
          >
            <option>Clothing & Fashion</option>
            <option>Electronics</option>
            <option>Home & Furniture</option>
            <option>Health & Beauty</option>
            <option>Food & Beverage</option>
            <option>Other</option>
          </SelectField>
        </div>
        <Button type="submit" color="cyan" className="mt-8 w-full">
          Register as Seller
        </Button>
      </form>
    </AuthLayout>
  )
}
