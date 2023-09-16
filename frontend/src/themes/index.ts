import { extendTheme } from "@chakra-ui/react";

import "@fontsource/dm-sans";

import Alert from "./components/alert";
import Button from "./components/button";
import Center from "./components/center";
import Checkbox from "./components/checkbox";
import Divider from "./components/divider";
import Form from "./components/form";
import FormError from "./components/formError";
import Input from "./components/input";
import Popover from "./components/popover";
import Progress from "./components/progress";
import Radio from "./components/radio";
import Select from "./components/select";
import Spinner from "./components/spinner";
import Table from "./components/table";
import Tabs from "./components/tabs";
import Tag from "./components/tag";
import Textarea from "./components/textarea";
import colors from "./colors";
import textStyles from "./typography";

const theme = extendTheme({
  fonts: {
    heading: "'DM Sans', sans-serif",
    body: "'DM Sans', sans-serif",
  },
  colors,
  textStyles,
  components: {
    Alert,
    Button,
    Center,
    Checkbox,
    Divider,
    Form,
    FormError,
    Input,
    Popover,
    Progress,
    Radio,
    Select,
    Spinner,
    Table,
    Tabs,
    Tag,
    Textarea,
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});

export default theme;
