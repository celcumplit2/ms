import AsideMenu from '@/components/dashboard/layout/aside-menu';

export default function Aside() {
    return (
        <aside className="hidden w-1/6 lg:flex bg-gray-900 box-border">
            <AsideMenu />
        </aside>
    );
}
