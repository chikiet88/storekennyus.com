/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'group',
        icon: 'heroicons_outline:chart-pie',
        children: [
            {
                id: 'danhmuc',
                title: 'Danh mục',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/admin/danhmuc',
            },
        ],
    },
    {
        id: 'menu',
        title: 'Menu',
        type: 'aside',
        icon: 'heroicons_outline:chart-pie',
        link: '/admin/menu',
    },
    {
        id: 'danhmuc',
        title: 'Danh mục',
        type: 'aside',
        icon: 'heroicons_outline:chart-pie',
        link: '/admin/danhmuc',
    },
    {
        id: 'sanpham',
        title: 'Sản phẩm',
        type: 'aside',
        icon: 'heroicons_outline:chart-pie',
        link: '/admin/sanpham',
    },
    
    {
        id: 'baiviet',
        title: 'Bài Viết',
        type: 'aside',
        icon: 'heroicons_outline:chart-pie',
        link: '/admin/baiviet',
    },
    {
        id: 'thuonghieu',
        title: 'Thương Hiệu',
        type: 'aside',
        icon: 'heroicons_outline:chart-pie',
        link: '/admin/thuonghieu',
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'aside',
        icon: 'heroicons_outline:chart-pie',
        children: [],
    },
    {
        id: 'danhmuc',
        title: 'Danh mục',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/admin/danhmuc',
    },
    {
        id: 'sanpham',
        title: 'Sản phẩm',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/admin/sanpham',
    },
    {
        id: 'baiviet',
        title: 'Bài Viết',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/admin/baiviet',
    },
    {
        id: 'thuonghieu',
        title: 'Thương hiệu ',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/admin/thuonghieu',
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
