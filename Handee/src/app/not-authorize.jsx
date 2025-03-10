import { Button } from '@/components/common/Button'
import { CirclesBackground } from '@/components/demo/CirclesBackground'
import { Container } from '@/components/common/Container'

export default function Unauthorized() {
  return (
    <Container className="relative isolate flex h-full flex-col items-center justify-center py-20 text-center sm:py-32">
      <CirclesBackground className="absolute top-1/2 left-1/2 -z-10 mt-44 w-[68.125rem] -translate-x-1/2 -translate-y-1/2 stroke-gray-300/30 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)]" />
      <p className="text-sm font-semibold text-gray-900">403</p>
      <h1 className="mt-2 text-3xl font-medium tracking-tight text-gray-900">
        Access Denied
      </h1>
      <p className="mt-2 text-lg text-gray-600">
        You do not have permission to view this page.
      </p>
      <div className="mt-8 flex gap-4">
        <Button href="/" variant="outline">
          Go back home
        </Button>
        <Button href="/login" variant="solid">
          Login
        </Button>
      </div>
    </Container>
  )
}
