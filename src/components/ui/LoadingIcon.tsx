import CircularProgress from '@mui/material/CircularProgress';


export default function CircularIndeterminate() {
  
    return (
        <div className='flex w-full justify-center items-center'>
          <svg width={0} height={0}>
            <defs>
              <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e01cd5" />
                <stop offset="100%" stopColor="#1CB5E0" />
              </linearGradient>
            </defs>
          </svg>
          <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
        </div>
      );

  
}