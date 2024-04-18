import BalanceHistory from './balanceHistory';
import Provisioning from '../provisioning/provisioning';

export default function Balance({ id }: { id: string }) {



  return (
    <>

      <div className='mb-10'>
        <BalanceHistory id={id} />
      </div>
      <div className=''>

        <Provisioning id={id} />

      </div>

    </>
  )
}
