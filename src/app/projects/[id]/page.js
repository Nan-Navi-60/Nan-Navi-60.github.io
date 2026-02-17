import { projectList } from '@/data/projectList';
import Registry from '@/components/project-contents/Registry';
import Image from 'next/image'

// 정적으로 만들 페이지의 수 확인
export async function generateStaticParams() {
  return projectList.map((p) => ({ id: p.id.toString() }));
}

export default async function ProjectDetail({ params }) {
  
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);

    return <Registry id={id} />;
}