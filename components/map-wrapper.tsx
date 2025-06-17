"use client"

import { MapProps } from '@/components/map';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import("@/components/map"), { ssr: false })

const MapWrapper = (props: MapProps) => <Map {...props} />

export default MapWrapper;
