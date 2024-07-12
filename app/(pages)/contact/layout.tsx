import PurpleHaloGroup from '@/components/PurpleHaloGroup';

export default function Layout({children}:{children: React.ReactNode}) {
  return (
    <>
      <PurpleHaloGroup hiddenIds={[1, 5]} />
      {children}
    </>
  );
}
