import type { IconName } from '@/components/Icon';
export type ObjectKind='map'|'database'|'cube'|'browser'|'calendar'|'messages'|'hub'|'buildings'|'steps'|'tiers'|'globe'|'headset'|'book'|'shield'|'document'|'coin'|'calculator'|'briefcase'|'envelope'|'compass';
type Scene={title:string;kind:ObjectKind;icon:IconName;labels:string[];accent?:string};
export const heroScenes = {
 philippines:{title:'Connected from the Philippines',kind:'map',icon:'globe',labels:['Luzon','Visayas','Mindanao']},
 crm:{title:'One connected CRM',kind:'database',icon:'database',labels:['Contacts','Conversations','Pipeline'],accent:'#8bbdff'},
 ai:{title:'Intelligence with a human touch',kind:'cube',icon:'cpu',labels:['Conversations','Automation','People'],accent:'#b8a2ff'},
 digital:{title:'Your digital front door',kind:'browser',icon:'monitor',labels:['Websites','Landing pages','Funnels']},
 appointment:{title:'Make room for the next conversation',kind:'calendar',icon:'calendar',labels:['Schedule','Confirm','Remind']},
 lead:{title:'Keep the conversation moving',kind:'messages',icon:'message',labels:['Respond','Nurture','Reconnect']},
 integrations:{title:'Connect the tools you use',kind:'hub',icon:'link',labels:['Native tools','Connectors','API']},
 industries:{title:'Built around your business',kind:'buildings',icon:'building',labels:['Local services','Professionals','Growing teams']},
 how:{title:'From first step to forward momentum',kind:'steps',icon:'workflow',labels:['Discover','Build','Launch']},
 pricing:{title:'Three ways to move forward',kind:'tiers',icon:'chart',labels:['Launch','Growth','Scale']},
 about:{title:'People behind the platform',kind:'globe',icon:'users',labels:['Strategy','Systems','People']},
 services:{title:'Support that works together',kind:'hub',icon:'briefcase',labels:['CRM','Automation','Support']},
 va:{title:'Real people. Reliable follow-through.',kind:'headset',icon:'headset',labels:['Dedicated support','Daily operations','Your team']},
 generic:{title:'Your connected business',kind:'globe',icon:'globe',labels:['Systems','People','Growth']},
 contact:{title:'A conversation starts here',kind:'envelope',icon:'mail',labels:['Your goals','Your questions','Next steps']},
 calculator:{title:'A clearer view of missed opportunity',kind:'calculator',icon:'chart',labels:['Inquiries','Follow-up gap','Estimate']},
 resources:{title:'Ideas to put into practice',kind:'book',icon:'book',labels:['Guides','Checklists','Tools']},
 faq:{title:'Find your next answer',kind:'book',icon:'search',labels:['Questions','Clarity','Next steps']},
 portfolio:{title:'A window into our work',kind:'browser',icon:'monitor',labels:['Websites','Campaigns','Systems']},
 careers:{title:'Build your next chapter',kind:'briefcase',icon:'briefcase',labels:['Skills','Opportunity','Teamwork']},
 'career-ea':{title:'Your skills, connected to opportunity',kind:'headset',icon:'headset',labels:['Organization','Communication','Support']},
 'career-sales':{title:'Turn conversations into partnerships',kind:'briefcase',icon:'growth',labels:['Relationships','Discovery','Growth']},
 referral:{title:'A good connection goes further',kind:'hub',icon:'hands',labels:['Connect','Introduce','Collaborate']},
 affiliate:{title:'Grow through partnership',kind:'hub',icon:'link',labels:['Share','Connect','Grow']},
 media:{title:'Explore the work behind the brand',kind:'browser',icon:'monitor',labels:['Projects','Resources','Ideas']},
 'guide-va':{title:'A thoughtful handoff',kind:'book',icon:'clipboard',labels:['Priorities','Instructions','Review']},
 'guide-lead':{title:'Give every lead a next step',kind:'book',icon:'message',labels:['Capture','Follow up','Review']},
 'guide-crm':{title:'Build the process first',kind:'book',icon:'workflow',labels:['Organize','Prepare','Automate']},
 privacy:{title:'Your information, handled with care',kind:'shield',icon:'lock',labels:['Information','Privacy','Security']},
 terms:{title:'Clear expectations, shared understanding',kind:'document',icon:'file',labels:['Terms','Responsibilities','Support']},
 refund:{title:'Understand your options',kind:'coin',icon:'refresh',labels:['Eligibility','Cancellations','Contact']},
 thanks:{title:'A clear next step',kind:'envelope',icon:'check',labels:['Your inquiry','Our team','Next steps']},
 navigation:{title:'Find your way forward',kind:'compass',icon:'search',labels:['Explore','Discover','Home']},
} satisfies Record<string,Scene>;
export type Hero3DVariant=keyof typeof heroScenes;
export const pageHeroVariants:Record<string,Hero3DVariant>={
 '/':'philippines','/sales-growth-system':'crm','/virtual-assistant-services':'va','/services':'services','/crm-automation':'crm','/ai-automation':'ai','/digital-solutions':'digital','/appointment-setting':'appointment','/lead-follow-up':'lead','/integrations':'integrations','/industries':'industries','/how-it-works':'how','/pricing':'pricing','/contact':'contact','/book-a-call':'contact','/about':'about','/portfolio':'portfolio','/faq':'faq','/careers':'careers','/resources':'resources','/resources/affiliate':'affiliate','/resources/media':'media','/careers/account-rep':'career-sales','/careers/executive-assistant':'career-ea','/careers/referral':'referral','/privacy':'privacy','/terms':'terms','/refund':'refund','/missed-revenue-calculator':'calculator','/guide-va-delegation':'guide-va','/guide-lead-follow-up':'guide-lead','/guide-crm-readiness':'guide-crm','/thank-you':'thanks',
};
