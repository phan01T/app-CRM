export type Theme = 'dark' | 'light';
export type Variant = 'expanded' | 'collapsed';

export interface MenuItem {
  label: string;
  icon: string;           // tên icon (key SVG)
  route?: string;
  badge?: number;
  children?: MenuItem[];
}
