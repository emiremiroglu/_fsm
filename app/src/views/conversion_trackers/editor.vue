<!-- CONVERSION TRACKER EDITOR -->
<script setup>
  import { ref, onMounted, inject, watch } from 'vue';
  import { useRoute } from 'vue-router'
  import { VAceEditor } from 'vue3-ace-editor';

  import session from '@/lib/session';
  import get from '@/lib/get';
  import shortid from 'shortid';
  
  import 'ace-builds/src-noconflict/mode-javascript';
  import 'ace-builds/src-noconflict/theme-dawn';

  import {
    ChevronLeftIcon,
    ArrowDownTrayIcon
  } from '@heroicons/vue/20/solid'

  const route = useRoute()

  const id = ref(route.query.id)
  const loading = ref(true)
  const tracker = ref({})
  
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
    mode: 'ace/mode/javascript' // string: path to language mode 
  })

  onMounted(() => {
    if(id.value) {
      get('/fsm/conversion_trackers/' + id.value).then(data => {
        tracker.value = data
        title.value = data.name
        loading.value = false
      })
    } else {
      title.value = 'New Conversion Tracker'
      tracker.value.code = '//JS goes here'
      tracker.value.filename = shortid.generate() + '.js'
      loading.value = false
    }
  })
</script>

<template>
  <main class="flex flex-col md:flex-row">
    <section v-if="!loading" class="flex flex-col gap-3 p-6 grow relative h-screen">
      <div class="flex items-center justify-between gap-6 pb-6 w-full">
        <router-link to="/conversion-trackers" class="button">
          <ChevronLeftIcon class="w-5"/>
          Back
        </router-link>
        <h1 class="text-2xl font-semibold leading-tight">
          <Title :_="title" />
        </h1>
        <button to="/" class="button">
          <ArrowDownTrayIcon class="w-5"/>
          Download
        </button>
      </div>
      <input class="w-full p-4" type="text" v-model="tracker.filename" disabled>
      <div class="relative flex-1">
        <v-ace-editor class="absolute w-full h-full rounded" ref="editor" v-model:value="tracker.code" lang="javascript" :options="options" />
      </div>
    </section>
    <section v-if="loading" class="flex items-center justify-center absolute w-screen h-screen top-0 right-0 bottom-0 left-0">
      <Loader />
    </section>
  </main>
</template>