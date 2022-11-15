import useSWR from 'swr'

function sleep(msec: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, msec)
  })
}

const fetcher = (url: string) =>
  fetch(url).then(async (res) => {
    sleep(5000)
    return res.json()
  })

const Swr = () => {
  const { data, error } = useSWR('https://api.github.com/repos/vercel/swr', fetcher)

  if (error) return <div>An error has occurred.</div>
  if (!data) return <div>Loading...</div>

  return (
    <div>
      <main>
        <h1>{data.name}</h1>
        <p>{data.description}</p>
        <p>
          <strong>👁 {data.subscribers_count}</strong> <strong>✨ {data.stargazers_count}</strong>{' '}
          <strong>🍴 {data.forks_count}</strong>
        </p>
      </main>
    </div>
  )
}
export default Swr
