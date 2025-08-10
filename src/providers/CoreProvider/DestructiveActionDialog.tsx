import { useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/Button';
import { Dialog } from '@/components/Dialog';
import { useDestructiveActionStore } from '@/hooks/useDestructiveAction/useDestructiveActionStore';
import type { DestructiveActionDef } from '@/hooks/useDestructiveAction/useDestructiveActionStore';
import { useTranslation } from '@/hooks/useTranslation';

export const DestructiveActionDialog = () => {
  const deletePendingDestructiveAction = useDestructiveActionStore((store) => store.deletePendingDestructiveAction);
  const pendingDestructiveActions = useDestructiveActionStore((store) => store.pendingDestructiveActions);
  const { resolvedLanguage, t } = useTranslation();

  const current = useMemo<DestructiveActionDef | null>(() => {
    if (pendingDestructiveActions[0]) {
      return pendingDestructiveActions[0];
    }
    return null;
  }, [pendingDestructiveActions]);

  const { defaultDescription, defaultTitle } = useMemo(() => {
    return {
      defaultDescription: t({
        en: 'This action cannot be reversed. Please confirm that you would like to continue.',
        fr: 'Cette action ne peut être inversée. Veuillez confirmer que vous souhaitez poursuivre.'
      }),
      defaultTitle: t({
        en: 'Confirm Action',
        fr: "Confirmer l'action"
      })
    };
  }, [resolvedLanguage]);

  const [display, setDisplay] = useState<{ description: string; title: string }>({
    description: current?.description ?? defaultDescription,
    title: current?.title ?? defaultTitle
  });

  useEffect(() => {
    if (current) {
      setDisplay({
        description: current.description ?? defaultDescription,
        title: current.title ?? defaultTitle
      });
    }
  }, [defaultDescription, defaultTitle, current]);

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
    <Dialog open={current !== null} onOpenChange={handleOpenChange}>
      <Dialog.Content onOpenAutoFocus={(event) => event.preventDefault()}>
        <Dialog.Header>
          <Dialog.Title>{display.title}</Dialog.Title>
          <Dialog.Description>{display.description}</Dialog.Description>
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
