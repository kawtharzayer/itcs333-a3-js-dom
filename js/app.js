(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    const form      = document.querySelector('#todo-form');
    const input     = document.querySelector('#todo-input');
    const list      = document.querySelector('#todo-list');
    const errorMsg  = document.querySelector('#error-msg');
    const counter   = document.querySelector('#counter');
    const btnAll    = document.querySelector('#filter-all');
    const btnActive = document.querySelector('#filter-active');
    const btnDone   = document.querySelector('#filter-done');
    let currentFilter = 'all';

    function updateCounter() {
      const remaining = list.querySelectorAll('li:not(.completed)').length;
      counter.textContent = remaining + ' item(s) left';
    }

    function applyFilter() {
      const items = list.querySelectorAll('li');
      items.forEach(function (li) {
        const done = li.classList.contains('completed');
        const hide = (currentFilter === 'active' && done) ||
                     (currentFilter === 'done' && !done);
        li.classList.toggle('hidden', hide);
        li.style.display = hide ? 'none' : '';
      });
    }

    function refresh() {
      applyFilter();
      updateCounter();
    }

    function createItem(text) {
      const li = document.createElement('li');

      const span = document.createElement('span');
      span.className = 'item-text';
      span.textContent = text;

      const del = document.createElement('button');
      del.type = 'button';
      del.className = 'delete-btn';
      del.textContent = 'Delete';

      li.appendChild(span);
      li.appendChild(del);
      return li;
    }

    function handleSubmit(e) {
      e.preventDefault();
      const text = input.value.trim();

      if (text === '') {
        errorMsg.classList.remove('hidden');
        return;
      }

      errorMsg.classList.add('hidden');
      list.appendChild(createItem(text));
      input.value = '';
      input.focus();
      refresh();
    }

    // one delegated listener on the list
    function handleListClick(e) {
      const li = e.target.closest('li');
      if (!li) return;

      if (e.target.classList.contains('delete-btn')) {
        list.removeChild(li);
      } else if (e.target.classList.contains('item-text')) {
        li.classList.toggle('completed');
      } else {
        return;
      }
      refresh();
    }

    function showAll(e)    { currentFilter = 'all';    refresh(); }
    function showActive(e) { currentFilter = 'active'; refresh(); }
    function showDone(e)   { currentFilter = 'done';   refresh(); }

    form.addEventListener('submit', handleSubmit);
    list.addEventListener('click', handleListClick);
    btnAll.addEventListener('click', showAll);
    btnActive.addEventListener('click', showActive);
    btnDone.addEventListener('click', showDone);

    refresh();
  }
})();
