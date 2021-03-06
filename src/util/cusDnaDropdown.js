export default {
  name: '',
  icon: 'CropIcon',
  expanded: true,
  items: [
    { name: 'Invoice', icon: 'FileTextIcon', to: '/invoice' },
    { name: 'Estimate', icon: 'FileTextIcon' },
    null,
    { name: 'Receive Payment', icon: 'FileTextIcon', to: '/customerpayment' },
    { name: 'Rewards', icon: 'AwardIcon', modalTarget: 'Transfer' },
    null,
    { name: 'Setting', icon: 'ToolIcon' }
  ]
};
