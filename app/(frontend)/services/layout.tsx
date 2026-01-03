import React from 'react'
import Navbar from '@/app/(frontend)/(ui)/components/Navbar';
import Footer from '@/app/(frontend)/(ui)/components/Footer';
export default function ServiceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <Navbar />
            {children}
            <Footer />
        </section>
    )
}
