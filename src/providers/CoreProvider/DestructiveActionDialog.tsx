import { Button } from '@/components/Button';
import { Dialog } from '@/components/Dialog';
import { useDestructiveActionStore } from '@/hooks/useDestructiveAction/useDestructiveActionStore';
import { useTranslation } from '@/hooks/useTranslation';

export const DestructiveActionDialog = () => {
  const deletePendingDestructiveAction = useDestructiveActionStore((store) => store.deletePendingDestructiveAction);
  const pendingDestructiveActions = useDestructiveActionStore((store) => store.pendingDestructiveActions);
  const { t } = useTranslation();

  const current = pendingDestructiveActions[0] ?? null;
  const isOpen = current !== null;

  const handleConfirm = async () => {
    if (!current) {
      return;
    }
    try {
      await current.action();
    } finally {
      deletePendingDestructiveAction(current.id);
    }
  };

  const handleCancel = () => {
    if (current) {
      deletePendingDestructiveAction(current.id);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen && current) {
      deletePendingDestructiveAction(current.id);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Content onOpenAutoFocus={(event) => event.preventDefault()}>
        <Dialog.Header>
          <Dialog.Title>
            {current?.title ??
              t({
                en: 'Confirm Action',
                fr: "Confirmer l'action"
              })}
          </Dialog.Title>
          <Dialog.Description>
            {current?.description ??
              t({
                en: 'This action cannot be reversed. Please confirm that you would like to continue.',
                fr: 'Cette action ne peut être inversée. Veuillez confirmer que vous souhaitez poursuivre.'
              })}
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer>
          <Button className="min-w-16" type="button" variant="danger" onClick={() => void handleConfirm()}>
            {t('libui.yes')}
          </Button>
          <Button className="min-w-16" type="button" variant="primary" onClick={handleCancel}>
            {t('libui.no')}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};
