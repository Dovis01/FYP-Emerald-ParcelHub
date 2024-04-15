import {subDays, subHours} from "date-fns";

const now = new Date();
export const products=[
    {
        id: '5ece2c077e39da27658aa8a9',
        //image: '/assets/products/product-1.png',
        name: 'Healthcare Erbology',
        updatedAt: subHours(now, 6).getTime()
    },
    {
        id: '5ece2c0d16f70bff2cf86cd8',
        image: '/assets/products/product-2.png',
        name: 'Makeup Lancome Rouge',
        updatedAt: subDays(subHours(now, 8), 2).getTime()
    },
    {
        id: 'b393ce1b09c1254c3a92c827',
        image: '/assets/products/product-5.png',
        name: 'Skincare Soja CO',
        updatedAt: subDays(subHours(now, 1), 1).getTime()
    },
    {
        id: 'a6ede555t5da73t49tt5tc89',
        image: '/assets/products/product-6.png',
        name: 'Makeup Lipstick',
        updatedAt: subDays(subHours(now, 3), 3).getTime()
    },
    {
        id: 'a6edel56l0dl63i4lfl52c89',
        image: '/assets/products/product-1.png',
        name: 'Makeup Lipstick',
        updatedAt: subDays(subHours(now, 3), 2).getTime()
    },
    {
        id: 'a6ede1p670pa63fp9fp52c89',
        image: '/assets/products/product-2.png',
        name: 'Makeup Lipstick',
        updatedAt: subDays(subHours(now, 3), 8).getTime()
    },
    {
        id: 'a1edj1j66jdaj3f49f752c89',
        image: '/assets/products/product-7.png',
        name: 'Makeup Lipstick',
        updatedAt: subDays(subHours(now, 3), 6).getTime()
    },
    {
        id: 'a6ed415677d164f44f754c49',
        image: '/assets/products/product-5.png',
        name: 'Makeup Lipstick',
        updatedAt: subDays(subHours(now, 3), 7).getTime()
    },
    {
        id: 'a6ede15y7yda6yf4yfy8yc89',
        image: '/assets/products/product-4.png',
        name: 'Makeup Lipstick',
        updatedAt: subDays(subHours(now, 3), 3).getTime()
    },
    {
        id: 'bcad5524fe3a2f8f8620ceda',
        image: '/assets/products/product-7.png',
        name: 'Healthcare Ritual',
        updatedAt: subDays(subHours(now, 5), 6).getTime()
    }
];

export const order = [
    {
        id: 'f69f38313938387a6c12897f',
        ref: 'DEV1049',
        amount: 30.5,
        customer: {
            name: 'Ekaterina Tankova'
        },
        createdAt: 1704296500000,
        status: 'pending'
    },
    {
        id: 'f69f880ggg78187a6c12897f',
        ref: 'DEV1049',
        amount: 30.5,
        customer: {
            name: 'Era Oova'
        },
        createdAt: 1704296500000,
        status: 'pending'
    },
    {
        id: 'm69fuu0u29u81u7u6c12897f',
        ref: 'DEV1049',
        amount: 30.5,
        customer: {
            name: 'Eka Tanova'
        },
        createdAt: 1704296500000,
        status: 'pending'
    },
    {
        id: 'f69f88012978187a6c12897f',
        ref: 'DEV1049',
        amount: 30.5,
        customer: {
            name: 'Lia Ankova'
        },
        createdAt: 1704296500000,
        status: 'pending'
    },
    {
        id: '9eaa1c7dd4433f413c308ce2',
        ref: 'DEV1048',
        amount: 25.1,
        customer: {
            name: 'Cao Yu'
        },
        createdAt: 1703896400000,
        status: 'informed'
    },
    {
        id: '01a5230c811bd04996ce7c13',
        ref: 'DEV1047',
        amount: 10.99,
        customer: {
            name: 'Alexa Richardson'
        },
        createdAt: 1704290000000,
        status: 'uninformed'
    },
    {
        id: '1f4e1bd0a87cea23cdb83d18',
        ref: 'DEV1046',
        amount: 96.43,
        customer: {
            name: 'Anje Keizer'
        },
        createdAt: 1704297200000,
        status: 'pending'
    },
    {
        id: '9f974f239d29ede969367103',
        ref: 'DEV1045',
        amount: 32.54,
        customer: {
            name: 'Clarke Gillebert'
        },
        createdAt: 1704190800000,
        status: 'informed'
    },
    {
        id: 'ffc83c1560ec2f66a1c05596',
        ref: 'DEV1044',
        amount: 16.76,
        customer: {
            name: 'Adam Denisov'
        },
        createdAt: 1704090800000,
        status: 'informed'
    }
];

export const chartSeriesTrend = [
    {
        name: 'This year',
        data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20]
    },
    {
        name: 'Last year',
        data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13]
    }
];
