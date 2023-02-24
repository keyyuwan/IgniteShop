import { styled } from '@/styles'

const Button = styled('button', {
  backgroundColor: '$rocketseat',
})

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Button>Enviar</Button>
    </div>
  )
}
