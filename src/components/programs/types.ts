export interface Program {
    id: string;
    title: string;
    description: string;
    slug: string;
    ageRange: string;
    featuredImage: string;
}

export interface Principle {
    _key: string;
    title: string;
    description: string;
}

export interface TargetAudience {
    _key: string;
    icon: string;
    label: string;
}

export interface WhatWeDoStep {
    _key: string;
    step: number;
    title: string;
    description: string;
}

export interface ObjectiveItem {
    _key: string;
    description: string;
}

export interface WhyChooseUsItem {
    _key: string;
    text: string;
}

export interface InterventionModel {
    mainTitle?: string;
    subtitle?: string;
    introText?: string;
}

export interface MaxSatisfaction {
    title?: string;
    items?: string[];
}

export interface ObjectivesByArea {
    motorGruesa?: ObjectiveItem[];
    motorFina?: ObjectiveItem[];
    comunicacion?: ObjectiveItem[];
    psicologia?: ObjectiveItem[];
}
