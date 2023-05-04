import { extendTheme } from "@chakra-ui/react";

import "@fontsource/dm-sans";

import Alert from "./components/alert";
import Button from "./components/button";
import Checkbox from "./components/checkbox";
import Form from "./components/form";
import FormError from "./components/formError";
import Input from "./components/input";
import Radio from "./components/radio";
import Select from "./components/select";
import Table from "./components/table";
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
    Checkbox,
    Form,
    FormError,
    Input,
    Radio,
    Select,
    Table,
    Tag,
    Textarea,
  },
});

export default theme;
