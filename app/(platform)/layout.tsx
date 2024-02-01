import { ModalProvider } from '@/components/providers/modal-provider';
import { Toaster } from 'sonner';

const PlatformLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <>
            <Toaster />
            <ModalProvider />
                {children}
            
        </>
    )
}

export default PlatformLayout;