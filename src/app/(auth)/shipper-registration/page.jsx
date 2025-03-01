import Link from 'next/link'

import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/common/Button'
import { SelectField, TextField } from '@/components/common/Fields'

export const metadata = {
  title: 'Shipper Sign Up',
}

export default function ShipperRegister() {
  return (
    <AuthLayout
      title="Sign up as a Shipper"
      subtitle={
        <>
          <div>🚚 Join Our Network of Reliable Shippers</div>
          <div>🌎 Delivering Excellence, One Package at a Time</div>
          <div>📦 Grow Your Logistics Business with Us</div>
        </>
      }
    >
      <form>
        <div className="grid grid-cols-2 gap-6">
          <TextField
            label="Company Name"
            name="company_name"
            type="text"
            autoComplete="organization"
            required
          />
          <TextField
            label="Contact Person"
            name="contact_person"
            type="text"
            autoComplete="name"
            required
          />
          {/* <TextField
            className="col-span-full"
            label="Email Address"
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
          /> */}
          <TextField
            className="col-span-full"
            label="Business Address"
            name="business_address"
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
            label="Vehicle Type"
            name="vehicle_type"
            required
          >
            <option>Bike</option>
            <option>Van</option>
            <option>Truck</option>
            <option>Other</option>
          </SelectField>
        </div>
        <Button type="submit" color="cyan" className="mt-8 w-full">
          Register as Shipper
        </Button>
      </form>
    </AuthLayout>
  )
}
