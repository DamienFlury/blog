"use client"

import { MapProps } from '@/components/map';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import("@/components/map"), { ssr: false, loading: () => <div className="h-[320px] bg-slate-200 text-2xl flex items-center justify-center rounded-lg">Loading Map...</div> })

const MapWrapper = (props: MapProps) => <Map {...props} />

export default MapWrapper;
