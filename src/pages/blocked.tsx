import Head from "next/head"

export default function Blocked() {
  return (
    <div className={`app min-h-screen bg-gray-100 py-10`}>
      <Head>
        <title>300 words</title>
      </Head>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-10 text-center">
          Hey, slow down!
        </h1>
        <div>Error 429</div>
      </div>
    </div>
  )
}
