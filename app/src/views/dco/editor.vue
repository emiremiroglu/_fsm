<!-- DCO EDITOR -->
<script setup>
  import { ref, onMounted, inject, watch } from 'vue';
  import { useRoute } from 'vue-router'
  import { VAceEditor } from 'vue3-ace-editor';

  import session from '@/lib/session';
  import get from '@/lib/get';
  import shortid from 'shortid';
  
  import 'ace-builds/src-noconflict/mode-html';
  import 'ace-builds/src-noconflict/theme-dawn';

  import {
    ChevronLeftIcon,
    ArrowDownTrayIcon,
    CameraIcon,
    CloudArrowUpIcon
  } from '@heroicons/vue/24/outline'

  const route = useRoute()

  const id = ref(route.query.id)
  const loading = ref(true)
  const banner = ref({})
  
  const title = ref('')

  const options = ref({
    // editor options
    selectionStyle: 'line', // "line"|"text"
    highlightActiveLine: false, // boolean
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
    fontSize: 15, // number | string: set the font size to this many pixels
    fontFamily: undefined, // string: set the font-family css value
    maxLines: undefined, // number: set the maximum lines possible. This will make the editor height changes
    minLines: undefined, // number: set the minimum lines possible. This will make the editor height changes
    maxPixelHeight: 0, // number -> maxLines: set the maximum height in pixel, when 'maxLines' is defined. 
    theme: 'ace/theme/dawn', // theme string from ace/theme or custom?

    // session options
    firstLineNumber: 1, // number: the line number in first line
    overwrite: false, // boolean
    newLineMode: 'auto', // "auto" | "unix" | "windows"
    useSoftTabs: true, // boolean: true if we want to use spaces than tabs
    tabSize: 2, // number
    wrap: false, // boolean | string | number: true/'free' means wrap instead of horizontal scroll, false/'off' means horizontal scroll instead of wrap, and number means number of column before wrap. -1 means wrap at print margin
    indentedSoftWrap: true, // boolean
    mode: 'ace/mode/html' // string: path to language mode 
  })

  onMounted(() => {
    if(id.value) {
      get('/fsm/dco/' + id.value).then(data => {
        banner.value = data
        title.value = data.name
        loading.value = false
      })
    } else {
      title.value = 'New DCO Banner'
      banner.value.html = '<html></html>'
      loading.value = false
    }
  })
</script>

<template>
  <main class="flex">
    <section v-if="!loading" class="flex flex-col justify-between p-5 flex-1">
      <div class="flex items-center justify-between gap-5">
        <router-link to="/dco" class="button">
          <ChevronLeftIcon class="w-6"/>
        </router-link>
        <h1 class="text-2xl font-semibold leading-tight">
          <Title :_="title" />
        </h1>
        <button to="/" class="button">
          <CloudArrowUpIcon class="w-6"/>
        </button>
      </div>
      <div class="flex items-center justify-center w-full">
        <iframe id="preview" width="300" height="600" class="shadow-lg bg-white rounded"></iframe>
      </div>
      <!-- Toolkit -->
      <div class="w-full flex items-center justify-between">
        <span class="text-teal-700 p-4">99 KB</span>
        <div id="frames" class="flex gap-3 items-center">
          <span class="opacity-60 hover:opacity-100 cursor-pointer">300x250</span>
          <span class="text-zinc-800 bg-zinc-200 dark:text-zinc-200 dark:bg-zinc-700 rounded-full py-2 px-4">300x600</span>
          <span class="opacity-60 hover:opacity-100 cursor-pointer">728x90</span>
        </div>
        <div class="flex gap-3">
          <button class="p-3 opacity-60 hover:opacity-100 transition-opacity">
            <CameraIcon class="w-6"/>
          </button>
          <button class="p-3 opacity-60 hover:opacity-100 transition-opacity">
            <ArrowDownTrayIcon class="w-6"/>
          </button>
        </div>
      </div>
    </section>
    <section v-if="!loading" class="flex flex-col flex-1 relative h-screen">
      <div class="relative flex-1">
        <v-ace-editor class="absolute w-full h-full" ref="editor" v-model:value="banner.html" lang="html" :options="options" />
      </div>
    </section>
    <section v-if="loading" class="flex items-center justify-center absolute w-screen h-screen top-0 right-0 bottom-0 left-0">
      <Loader />
    </section>
  </main>
</template>