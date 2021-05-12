import {
  Alert,
  Aside,
  Autocomplete,
  Avatar,
  //   Upload,
  //   Progress,
  //   Spinner,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  // ButtonGroup,
  Card,

  //   Steps,
  //   Step,
  Carousel,
  CarouselItem,
  Checkbox,
  // CheckboxButton,
  // CheckboxGroup,
  Col,
  Collapse,
  CollapseItem,
  //   Cascader,
  //   ColorPicker,
  //   Transfer,
  Container,
  //   Pagination,
  Dialog,

  //   Footer,
  //   Timeline,
  //   TimelineItem,
  //   Link,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Form,
  FormItem,
  Image,

  // Drawer,
  InfiniteScroll,
  //   Menu,
  //   Submenu,
  //   MenuItem,
  //   MenuItemGroup,
  Input,

  //   Calendar,
  //   Backtop,
  //   PageHeader,
  //   CascaderPanel,
  Loading,
  Main,
  Message,
  MessageBox,
  Notification,
  Option,
  // OptionGroup,
  //   DatePicker,
  //   TimeSelect,
  //   TimePicker,
  Popover,
  //   InputNumber,
  Radio,
  RadioButton,
  RadioGroup,
  Rate,
  //   Icon,
  Row,
  Select,
  Slider,
  Switch,
  Table,
  TableColumn,
  TabPane,
  Tabs,
  Tag,
  Tooltip,
} from 'element-ui'
import locale from 'element-ui/lib/locale'
import langFa from 'element-ui/lib/locale/lang/fa'
import Vue from 'vue'

locale.use(langFa)

// Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Autocomplete)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
// Vue.use(Menu)
// Vue.use(Submenu)
// Vue.use(MenuItem)
// Vue.use(MenuItemGroup)
Vue.use(Input)
// Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Checkbox)
// Vue.use(CheckboxButton)
// Vue.use(CheckboxGroup)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
// Vue.use(OptionGroup)
Vue.use(Button)
// Vue.use(ButtonGroup)
Vue.use(Table)
Vue.use(TableColumn)
// Vue.use(DatePicker)
// Vue.use(TimeSelect)
// Vue.use(TimePicker)
Vue.use(Popover)
Vue.use(Tooltip)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tag)
// Vue.use(Tree)
Vue.use(Alert)
Vue.use(Slider)
// Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
// Vue.use(Upload)
// Vue.use(Progress)
// Vue.use(Spinner)
Vue.use(Badge)
Vue.use(Card)
Vue.use(Rate)
// Vue.use(Steps)
// Vue.use(Step)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Collapse)
Vue.use(CollapseItem)
// Vue.use(Cascader)
// Vue.use(ColorPicker)
// Vue.use(Transfer)
Vue.use(Container)
// Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
// Vue.use(Footer)
// Vue.use(Timeline)
// Vue.use(TimelineItem)
// Vue.use(Link)
Vue.use(Divider)
Vue.use(Image)
Vue.use(Avatar)
// Vue.use(Calendar)
// Vue.use(Backtop)
// Vue.use(PageHeader)
// Vue.use(CascaderPanel)
// Vue.use(Drawer)
Vue.use(InfiniteScroll)

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
// Vue.prototype.$confirm = MessageBox.confirm
// Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
