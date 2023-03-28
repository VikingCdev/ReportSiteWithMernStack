import { useEffect } from 'react';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDeletePayInfoMutation } from '../redux/api/payInfoApi';
import { toast } from 'react-toastify';

type IAdminPayInfoDeleteButtonProps = {
    info_id: string;
    settingPayInfoID: () => void;
  }
const AdminPayInfoDeleteButton = ({info_id, settingPayInfoID} : IAdminPayInfoDeleteButtonProps) => {

    const [deletePayInfo, { isLoading, error, isSuccess, isError }] = useDeletePayInfoMutation();

    useEffect(() => {
      settingPayInfoID(); 
    }, [info_id])

    useEffect(() => {
        if (isSuccess) {
          toast.success('Post deleted successfully');
        }
    
        if (isError) {
          if (Array.isArray((error as any).data.error)) {
            (error as any).data.error.forEach((el: any) =>
              toast.error(el.message, {
                position: 'top-right',
              })
            );
          } else {
            toast.error((error as any).data.message, {
              position: 'top-right',
            });
          }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [isLoading]);
    
      const onDeleteHandler = (id: string) => {

        if (window.confirm('Are you sure')) {
          deletePayInfo(id);
        }
    };

    return (
        <Button onClick={() => {onDeleteHandler(info_id)}}>
            <DeleteForeverIcon style={{color:"tomato"}} />
        </Button>
    )
}

export default AdminPayInfoDeleteButton;