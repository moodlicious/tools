"use client";

import dynamic from "next/dynamic";
import { Fragment, FragmentProps } from "react";

const ClientOnly = (props: FragmentProps) => <Fragment {...props} />;

export default dynamic(async () => ClientOnly, { ssr: false });
