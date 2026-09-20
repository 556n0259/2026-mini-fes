<script lang="ts">
  import { tick } from "svelte";
  import { photos } from "$lib/photos";

  let selectedGrade: "all" | 1 | 2 | 3 = $state("all");
  let termsOpen = $state(false);

  let downloadPhoto = $state<(typeof photos)[number] | null>(null);
  let termsAgreed = $state(false);
  let dontShowAgain = $state(false);

  const filteredPhotos = $derived(
    photos.filter((photo) => {
      const gradeMatch =
        selectedGrade === "all" || photo.grade === selectedGrade;

      return gradeMatch;
    }),
  );

  async function openDownload(photo: (typeof photos)[number]) {
    if (localStorage.getItem("photo-download-terms-agreed") === "true") {
      window.open(photo.image, "_blank");
      return;
    }

    downloadPhoto = photo;
    termsAgreed = false;
    dontShowAgain = false;
  }

  function closeDownload() {
    downloadPhoto = null;
  }

  function goToDownload() {
    if (!downloadPhoto || !termsAgreed) return;

    if (dontShowAgain) {
      localStorage.setItem("photo-download-terms-agreed", "true");
    }

    const imageUrl = downloadPhoto.image;
    downloadPhoto = null;
    window.open(imageUrl, "_blank");
  }
</script>

<svelte:head>
  <title>写真部展示</title>
  <meta name="description" content="文化祭 写真部展示" />
</svelte:head>

<header>
  <h1>写真部展示</h1>

  <button
    class="terms-button"
    onclick={() => (termsOpen = !termsOpen)}
    aria-expanded={termsOpen}
  >
    利用規約
    <span>{termsOpen ? "▲" : "▼"}</span>
  </button>

  {#if termsOpen}
    <section class="terms">
      <h2>利用規約</h2>

      <p>
        展示写真のダウンロード・利用にあたっては、以下の事項をご確認ください。
      </p>

      <ul>
        <li>写真の著作権は各作者に帰属します。</li>
        <li>個人的な利用の範囲でご利用ください。</li>
        <li>無断での再配布・販売・加工・転載はご遠慮ください。</li>
      </ul>
    </section>
  {/if}
</header>

<main>
  <section class="filters">
    <label>
      学年
      <select bind:value={selectedGrade}>
        <option value="all">すべて</option>
        <option value={1}>1年</option>
        <option value={2}>2年</option>
        <option value={3}>3年</option>
      </select>
    </label>
  </section>

  <p class="result-count">
    {filteredPhotos.length}作品
  </p>

  <section class="photos">
    {#each filteredPhotos as photo}
      <article class="photo-card">
        <img
          src={photo.image}
          alt={photo.title}
          draggable="false"
          oncontextmenu={(event) => event.preventDefault()}
        />

        <div class="info">
          <h2>{photo.title}</h2>
          <p>{photo.description}</p>
          <button class="download" onclick={() => openDownload(photo)}>
            ダウンロード
          </button>
        </div>
      </article>
    {/each}
  </section>

  {#if filteredPhotos.length === 0}
    <p class="no-results">条件に一致する写真がありません。</p>
  {/if}
</main>

{#if downloadPhoto}
  <div class="modal-backdrop">
    <div
      class="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-terms-title"
    >
      <h2 id="download-terms-title">利用規約</h2>

      <div class="terms-content">
        <h3>写真の利用について</h3>

        <p>
          展示写真のダウンロード・利用にあたっては、
          以下の事項をご確認ください。
        </p>

        <ul>
          <li>写真の著作権は各作者に帰属します。</li>
          <li>個人的な利用の範囲でご利用ください。</li>
          <li>無断での再配布・販売・加工・転載はご遠慮ください。</li>
        </ul>

        <p>
          上記の内容を確認し、規約に同意したうえで ダウンロードしてください。
        </p>
      </div>

      <label class="checkbox">
        <input type="checkbox" bind:checked={termsAgreed} />
        <span>利用規約に同意</span>
      </label>

      <label class="checkbox">
        <input type="checkbox" bind:checked={dontShowAgain} />
        <span>以降は表示しない</span>
      </label>

      <div class="modal-actions">
        <button
          class="download-page"
          onclick={goToDownload}
          disabled={!termsAgreed}
        >
          ダウンロードページへ
        </button>

        <button class="cancel" onclick={closeDownload}> キャンセル </button>
      </div>
    </div>
  </div>
{/if}

<style>
  header {
    border-bottom: 1px solid #ddd;
  }

  header > h1,
  header > .terms-button,
  .terms {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }

  header > h1 {
    padding: 2rem 1rem 1rem;
    margin-top: 0;
    margin-bottom: 0;
  }

  .terms-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1rem;
    border: 0;
    background: none;
    font: inherit;
    text-align: left;
    cursor: pointer;
  }

  .terms-button span {
    font-size: 0.8rem;
  }

  .terms {
    padding: 0 1rem 1.5rem;
  }

  .terms h2 {
    font-size: 1.1rem;
  }

  .terms li {
    margin: 0.5rem 0;
  }

  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .filters {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  select {
    min-width: 160px;
    padding: 0.6rem;
    font: inherit;
  }

  .result-count {
    color: #666;
  }

  .photos {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
  }

  .photo-card {
    overflow: hidden;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: white;
  }

  .photo-card img {
    display: block;
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
  }

  .info {
    padding: 1rem;
  }

  .info h2 {
    margin: 0 0 0.5rem;
  }

  .info p {
    margin: 0.4rem 0;
  }

  .download {
    display: inline-block;
    margin-top: 0.8rem;
    padding: 0.6rem 1rem;
    border: 1px solid #333;
    border-radius: 4px;
    color: inherit;
    text-decoration: none;
  }

  .no-results {
    padding: 3rem 0;
    text-align: center;
  }

  @media (max-width: 600px) {
    .filters {
      flex-direction: column;
    }

    select {
      width: 100%;
    }
  }

  .download {
    display: inline-block;
    margin-top: 0.8rem;
    padding: 0.6rem 1rem;
    border: 1px solid #333;
    border-radius: 4px;
    background: white;
    color: inherit;
    font: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  .modal-backdrop {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background: rgb(0 0 0 / 50%);
    z-index: 1000;
  }

  .modal {
    width: min(600px, 100%);
    max-height: min(700px, 90vh);
    overflow: auto;
    padding: 1.5rem;
    border-radius: 8px;
    background: white;
    box-shadow: 0 10px 30px rgb(0 0 0 / 20%);
  }

  .modal h2 {
    margin-top: 0;
  }

  .terms-content {
    height: 300px;
    overflow-y: auto;
    margin: 1rem 0;
    padding: 1rem;
    border: 1px solid #ddd;
  }

  .checkbox {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0.8rem 0;
  }

  .checkbox input {
    width: 1.1rem;
    height: 1.1rem;
  }

  .modal-actions {
    display: flex;
    gap: 0.8rem;
    margin-top: 1.5rem;
  }

  .modal-actions button {
    padding: 0.7rem 1rem;
    border: 1px solid #333;
    border-radius: 4px;
    background: white;
    font: inherit;
    cursor: pointer;
  }

  .modal-actions button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .download-page {
    flex: 1;
  }

  .cancel {
    flex: 0 0 auto;
  }
</style>
