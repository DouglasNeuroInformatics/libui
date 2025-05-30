/* eslint-disable @typescript-eslint/no-misused-promises */

import type React from 'react';

import type { Promisable } from 'type-fest';

import { useTranslation } from '@/hooks';

import { Button } from '../Button';
import { Dialog } from '../Dialog';

export type DestructiveActionPending = (() => Promisable<void>) | null;

export const DestructiveActionDialog: React.FC<{
  destructiveActionPending: DestructiveActionPending;
  setDestructiveActionPending: React.Dispatch<React.SetStateAction<DestructiveActionPending>>;
}> = ({ destructiveActionPending, setDestructiveActionPending }) => {
  const { t } = useTranslation();
  return (
    <Dialog
      open={destructiveActionPending !== null}
      onOpenChange={(open) => {
        if (!open) {
          setDestructiveActionPending(null);
        }
      }}
    >
      <Dialog.Content onOpenAutoFocus={(event) => event.preventDefault()}>
        <Dialog.Header>
          <Dialog.Title>
            {t({
              en: 'Confirm Action',
              fr: "Confirmer l'action"
            })}
          </Dialog.Title>
          <Dialog.Description>
            {t({
              en: 'This action cannot be reversed. Please confirm that you would like to continue.',
              fr: 'Cette action ne peut être inversée. Veuillez confirmer que vous souhaitez poursuivre.'
            })}
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer>
          <Button
            className="min-w-16"
            type="button"
            variant="danger"
            onClick={async () => {
              await destructiveActionPending?.();
              setDestructiveActionPending(null);
            }}
          >
            {t('libui.yes')}
          </Button>
          <Button
            className="min-w-16"
            type="button"
            variant="primary"
            onClick={() => setDestructiveActionPending(null)}
          >
            {t('libui.no')}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};
