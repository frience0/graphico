export default async function LoadingPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='p-8 rounded-xlw-full max-w-md text-center'>
        {/* Logo/Brand Section */}
        <div className='mb-6'>
          <h1 className='text-3xl font-bold text-gray-800 tracking-tight'>
            Graphico
          </h1>
          <p className='text-sm text-gray-600'>Premium T-Shirt Store</p>
        </div>

        {/* Loading Animation */}
        <div className='flex justify-center items-center mb-6'>
          <div className='relative'>
            <div className='w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
            <div className='absolute top-0 left-0 w-12 h-12 border-4 border-blue-300 border-t-transparent rounded-full animate-spin animate-reverse'></div>
          </div>
        </div>

        {/* Loading Message */}
        <div className='space-y-2'>
          <p className='text-lg font-medium text-gray-700'>
            Loading Your Style...
          </p>
          <p className='text-sm text-gray-500'>
            Preparing the finest t-shirt collection for you
          </p>
        </div>

        {/* Progress Bar */}
        {/* <div className='mt-6'>
          <div className='w-full bg-gray-200 rounded-full h-2'>
            <div className='bg-blue-500 h-2 rounded-full w-1/2 animate-pulse'></div>
          </div>
        </div> */}
      </div>

      {/* Footer */}
      <footer className='mt-8 text-gray-500 text-sm'>
        © {new Date().getFullYear()} Graphico. All rights reserved.
      </footer>
    </div>
  )
}
