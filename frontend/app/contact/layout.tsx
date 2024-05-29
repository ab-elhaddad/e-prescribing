import PurpleHaloGroup from '@/app/ui/custom/PurpleHaloGroup';

export default function Layout({children}:{children: React.ReactNode}) {
  return (
    <>
      <PurpleHaloGroup hiddenIds={[5]} />
      {children}
    </>
  );
}
