import { Employee } from '@/store/employees'

const data = [
  {
    firstName: 'Joel',
    headshot: {
      alt: 'headshot joel garrett',
      height: 340,
      id: '4Mv2CONANym46UwuuCIgK',
      mimeType: 'image/jpeg',
      type: 'image',
      url: 'https://namegame.willowtreeapps.com/images/headshot_joel_garrett.jpg',
      width: 340
    },
    id: '4NCJTL13UkK0qEIAAcg4IQ',
    jobTitle: 'Senior Software Engineer',
    lastName: 'Garrett',
    slug: 'joel-garrett',
    socialLinks: [],
    type: 'people'
  },
  {
    firstName: 'Jeff',
    headshot: {
      alt: 'headshot jeff ward',
      height: 340,
      id: '3BdQSQcuMgcs00qYoOuYSY',
      mimeType: 'image/jpeg',
      type: 'image',
      url: 'https://namegame.willowtreeapps.com/images/headshot_jeff_ward.jpg',
      width: 340
    },
    id: '1X2lomt8iIYImCQysey6Eq',
    jobTitle: 'Principal Software Engineer',
    lastName: 'Ward',
    slug: 'jeffery-ward',
    socialLinks: [],
    type: 'people'
  },
  {
    firstName: 'Ashley',
    headshot: {
      alt: 'headshot ashley joost',
      height: 340,
      id: 'ezBlWGiV9ucqAsiOo0Iy2',
      mimeType: 'image/jpeg',
      type: 'image',
      url: 'https://namegame.willowtreeapps.com/images/headshot_ashley_joost.jpg',
      width: 340
    },
    id: '56zuFgdeoMqAOuIKe0M4AU',
    jobTitle: 'Senior Software Engineer',
    lastName: 'Joost',
    slug: 'ashley-joost',
    socialLinks: [],
    type: 'people'
  },
  {
    firstName: 'Ben',
    headshot: {
      alt: 'ben frye 2020',
      height: 450,
      id: '6xFkqIGXS8WlbqAx8nQ5vX',
      mimeType: 'image/jpeg',
      type: 'image',
      url: 'https://namegame.willowtreeapps.com/images/ben_frye.jpeg',
      width: 450
    },
    id: '29XgxedqmAO86mGeImqwEK',
    jobTitle: 'Senior Software Engineer',
    lastName: 'Frye',
    slug: 'ben-frye',
    socialLinks: [],
    type: 'people'
  },
  {
    firstName: 'Christy',
    headshot: {
      alt: 'Christy Phillips, Chief Talent Officer at WillowTree, Inc.',
      height: 705,
      id: '64IBagkE0gga82G2W6cWsm',
      mimeType: 'image/png',
      type: 'image',
      url: 'https://namegame.willowtreeapps.com/images/Christy_HeadshotNew.png',
      width: 705
    },
    id: '2dMXmpIHPicQW6SW60qeKs',
    jobTitle: 'Chief Talent Officer',
    lastName: 'Phillips',
    slug: 'christy-phillips',
    socialLinks: [
      {
        callToAction: 'Follow Christy Phillips on LinkedIn',
        type: 'linkedin',
        url: 'https://www.linkedin.com/in/christyphillips1/'
      }
    ],
    type: 'people'
  },
  {
    bio: 'Senior Technical Recruiter',
    firstName: 'Heather',
    headshot: {
      alt: 'headshot heather raines2',
      height: 340,
      id: '4bvFPBvTU4iO84MqGs4mge',
      mimeType: 'image/jpeg',
      type: 'image',
      url: 'https://namegame.willowtreeapps.com/images/headshot_heather_raines2.jpg',
      width: 340
    },
    id: '4rugkOBzAcccWYKkKSqKQK',
    jobTitle: 'Senior Technical Recruiter',
    lastName: 'Raines',
    slug: 'heather-raines',
    socialLinks: [],
    type: 'people'
  }
]

export async function fetchEmployees (): Promise<Employee[]> {
  return data
}
