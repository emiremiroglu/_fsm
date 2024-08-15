<!-- CREATE -->
<script setup>
  import { ref, onMounted } from 'vue';
  import { VAceEditor } from 'vue3-ace-editor';
  import 'ace-builds/src-noconflict/mode-javascript';
  import 'ace-builds/src-noconflict/theme-dawn';

  import shortid from 'shortid';

  const loading = ref(false)
  const filename = ref(shortid.generate()+'.js')
  const content = ref(``)
  
  const options = ref({
    // editor options
    selectionStyle: 'line', // "line"|"text"
    highlightActiveLine: true, // boolean
    highlightSelectedWord: true, // boolean
    readOnly: false, // boolean: true if read only
    cursorStyle: 'ace', // "ace"|"slim"|"smooth"|"wide"
    mergeUndoDeltas: true, // false|true|"always"
    behavioursEnabled: true, // boolean: true if enable custom behaviours
    wrapBehavioursEnabled: true, // boolean
    autoScrollEditorIntoView: undefined, // boolean: this is needed if editor is inside scrollable page
    keyboardHandler: null, // function: handle custom keyboard events
    
    // renderer options
    animatedScroll: false, // boolean: true if scroll should be animated
    displayIndentGuides: false, // boolean: true if the indent should be shown. See 'showInvisibles'
    showInvisibles: false, // boolean -> displayIndentGuides: true if show the invisible tabs/spaces in indents
    showPrintMargin: true, // boolean: true if show the vertical print margin
    printMarginColumn: 80, // number: number of columns for vertical print margin
    printMargin: undefined, // boolean | number: showPrintMargin | printMarginColumn
    showGutter: true, // boolean: true if show line gutter
    fadeFoldWidgets: false, // boolean: true if the fold lines should be faded
    showFoldWidgets: true, // boolean: true if the fold lines should be shown ?
    showLineNumbers: true,
    highlightGutterLine: false, // boolean: true if the gutter line should be highlighted
    hScrollBarAlwaysVisible: false, // boolean: true if the horizontal scroll bar should be shown regardless
    vScrollBarAlwaysVisible: false, // boolean: true if the vertical scroll bar should be shown regardless
    fontSize: 14, // number | string: set the font size to this many pixels
    fontFamily: undefined, // string: set the font-family css value
    maxLines: undefined, // number: set the maximum lines possible. This will make the editor height changes
    minLines: undefined, // number: set the minimum lines possible. This will make the editor height changes
    maxPixelHeight: 0, // number -> maxLines: set the maximum height in pixel, when 'maxLines' is defined. 
    scrollPastEnd: 0, // number -> !maxLines: if positive, user can scroll pass the last line and go n * editorHeight more distance 
    fixedWidthGutter: false, // boolean: true if the gutter should be fixed width
    theme: 'ace/theme/textmate', // theme string from ace/theme or custom?

    // session options
    firstLineNumber: 1, // number: the line number in first line
    overwrite: false, // boolean
    newLineMode: 'auto', // "auto" | "unix" | "windows"
    useWorker: false, // boolean: true if use web worker for loading scripts
    useSoftTabs: true, // boolean: true if we want to use spaces than tabs
    tabSize: 4, // number
    wrap: false, // boolean | string | number: true/'free' means wrap instead of horizontal scroll, false/'off' means horizontal scroll instead of wrap, and number means number of column before wrap. -1 means wrap at print margin
    indentedSoftWrap: true, // boolean
    foldStyle: 'markbegin', // enum: 'manual'/'markbegin'/'markbeginend'.
    mode: 'ace/mode/javascript' // string: path to language mode 
  })

  const aceInit = () => {
    content.value = '// Javascript goes here'
  }

  onMounted(() => {

  })

</script>

<template>
  <section v-if="!loading" class="p-6">
    <div class="flex items-center justify-between gap-6 pb-6 w-ful">
      <router-link to="/conversion_trackers" class="button">
        Back
      </router-link>
      <h1 class="text-2xl font-semibold leading-tight">New Conversion Tracker</h1>
      <button to="/" class="button">
        Download
      </button>
    </div>
    <div class="flex flex-col gap-6">
      <input type="text" v-model="filename" disabled>
      <v-ace-editor v-model:value="content" @init="aceInit" lang="javascript" theme="chrome" class="h-screen" :options="options" /></div>
  </section>
  <section v-if="loading" class="flex items-center justify-center absolute w-screen h-screen top-0 right-0 bottom-0 left-0">
    <Loader tw="h-3 fill-zinc-600 opacity-30" />
  </section>
</template>

<style scoped>

</style>