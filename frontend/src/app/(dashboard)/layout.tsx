import Navbar from '@/components/navbar/navbar';
import SideBar from '@/components/sidebar/sidebar';

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex flex-col h-screen'>
			<Navbar />
			<SideBar />
			<main className='flex ml-64 h-full'>{children}</main>
		</div>
	);
};

export default MainLayout;
