export const DATA = {
  header: {
    content: {
      active: true,
      title: { active: true, content: 'Chat' },
      description: {
        active: true,
        content: 'Describe the job, get the quote',
      },
    },
  },
  navigation: {
    link: [
      {
        id: '0',
        active: true,
        name: 'Chat',
        value: 'chat',
        linkTo: 'ChatContent',
      },
      {
        id: '1',
        active: true,
        name: 'Files',
        value: 'files',
        linkTo: 'AttachementView',
      },
      {
        id: '2',
        active: true,
        name: 'Job Description',
        value: 'jobdesc',
        linkTo: 'JobDescription',
      },
    ],
  },
  jobDetails: {
    jobId: null,
  },
};
