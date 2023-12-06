import * as styles from './file-manager.css';
import { Search } from './components/search';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Directory } from '../../third-parties/communishield/types/directory';
import { Communishield } from '../../third-parties/communishield/client';
import { FileTable } from './components/file-table';
import { ActionContext } from './contexts/action.context';
import { DialogContext } from '../../contexts/dialog.context';
import { LoadingContext } from '../../contexts/loading.context';
import { ErrorContext } from '../../contexts/error.context';
import { FileView } from './components/file-view';
import { FileEdit } from './components/file-edit';
import { FileDelete } from './components/file-delete';
import { DirectoryEdit } from './components/directory-edit';
import { DirectoryDelete } from './components/directory-delete';

export function FileManagerPage() {
  const { loading, setLoading } = useContext(LoadingContext);
  const { setDialogProps } = useContext(DialogContext);
  const { setError } = useContext(ErrorContext);
  const [actionParams, setActionParams] = useState<
    | {
      action: 'create' | 'read' | 'update' | 'delete';
      path: string;
      type: 'file' | 'directory';
    }
    | undefined
  >(undefined);
  const [directory, setDirectory] = useState<Directory | undefined>(undefined);

  const actionContextValue = useMemo(
    () => ({
      actionParams,
      setActionParams,
    }),
    [actionParams, setActionParams]
  );

  const handleSearch = async (query: string) => {
    setLoading(true);

    try {
      const directory = await Communishield.getDirectory(query);

      setDirectory(directory);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (actionParams === undefined || loading) {
        return;
      }

      setLoading(true);

      const { action, path, type } = actionParams;

      try {
        if (type === 'file') {
          const file = await Communishield.getFile(path);

          if (action === 'read') {
            setDialogProps({
              title: 'File Preview',
              color: 'gray',
              message: <FileView file={file} />,
              isOpen: true,
              onDismiss: () => { },
            });
            return;
          }

          if (action === 'update') {
            setDialogProps({
              title: 'File Edit',
              color: 'gray',
              message: <FileEdit file={file} />,
              isOpen: true,
              onDismiss: () => { },
            });
            return;
          }

          if (action === 'delete') {
            setDialogProps({
              title: 'File Delete',
              color: 'gray',
              message: (
                <FileDelete
                  file={file}
                  onDelete={() => {
                    handleSearch(directory?.path ?? '/');
                  }}
                />
              ),
              isOpen: true,
              onDismiss: () => { },
            });
            return;
          }
        } else if (type === 'directory') {
          const targetDirectory = await Communishield.getDirectory(path);

          if (action === 'update') {
            setDialogProps({
              title: 'Directory Edit',
              color: 'gray',
              message: <DirectoryEdit directory={targetDirectory} />,
              isOpen: true,
              onDismiss: () => { },
            });
            return;
          }

          if (action === 'delete') {
            setDialogProps({
              title: 'Directory Delete',
              color: 'gray',
              message: (
                <DirectoryDelete
                  directory={targetDirectory}
                  onDelete={() => {
                    handleSearch(directory?.path ?? '/');
                  }}
                />
              ),
              isOpen: true,
              onDismiss: () => { },
            });
            return;
          }
        }
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
        setActionParams(undefined);
      }
    })();
  });

  useEffect(() => {
    handleSearch(directory?.path ?? '/');
  }, [actionParams]);

  return (
    <ActionContext.Provider value={actionContextValue}>
      <div className={styles.container}>
        <section className={styles.search}>
          <Search onSubmit={handleSearch} />
        </section>
        <section className={styles.fileManager}>
          <FileTable
            directory={directory}
            onFinish={() => {
              handleSearch(directory?.path ?? '/');
            }}
          />
        </section>
      </div>
    </ActionContext.Provider>
  );
}
