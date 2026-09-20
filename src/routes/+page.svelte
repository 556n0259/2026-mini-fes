<script lang="ts">
  import { photos } from "$lib/photos";

  let selectedGrade: "all" | 1 | 2 = $state("all");
  let termsOpen = $state(false);

  const filteredPhotos = $derived(
    photos.filter((photo) => {
      const gradeMatch =
        selectedGrade === "all" || photo.grade === selectedGrade;

      return gradeMatch;
    }),
  );
</script>

<svelte:head>
  <title>写真部データ配布</title>
  <meta name="description" content="文化祭 写真部展示" />
</svelte:head>

<header>
  <h1>写真部データ配布</h1>
</header>

<main>
  <section class="terms">
    <button onclick={() => (termsOpen = !termsOpen)} aria-expanded={termsOpen}>
      利用規約
      <span>{termsOpen ? "▲" : "▼"}</span>
    </button>
    {#if termsOpen}
      <div>
        <p>ダウンロードされた時点で、規約に同意したものとみなします。</p>
        <p>
          壁紙への設定などの個人利用の範囲で、どなたでも無料でご利用いただけます。トリミング・加工可能です。<br
          />
        </p>
        <p>
          【禁止事項】<br />
          転載/二次配布/SNSプロフィールへの利用/自作発言/商用利用
        </p>
        <p>
          【注意事項】<br />
          各写真の著作権は、福岡高校写真部および撮影者に帰属します。データを利用したことで生じたトラブルや不具合について、当部および写真部は一切の責任を負いません。
        </p>
      </div>
    {/if}
  </section>

  <section class="filters">
    <label>
      <span>学年</span>
      <select bind:value={selectedGrade}>
        <option value="all">すべて</option>
        <option value={1}>1年</option>
        <option value={2}>2年</option>
      </select>
    </label>

    <p class="result-count">
      {filteredPhotos.length}作品
    </p>
  </section>

  <section class="photos">
    {#each filteredPhotos as photo}
      <div>
        <div class="photo">
          <div class="frame">
            <img
              src={photo.image}
              alt="写真"
              draggable="false"
              oncontextmenu={(event) => event.preventDefault()}
            />
          </div>
        </div>

        <div class="plate">
          <span>{photo.grade}年</span>

          <button
            class="download"
            onclick={() => window.open(photo.image, "_blank")}
          >
            ダウンロード
          </button>
        </div>
      </div>
    {/each}
  </section>
</main>

<footer>
  <a href="https://www.instagram.com/fhs_photo.club/" target="_blank">
    <span>Instagram @fhs_photo.club</span>
  </a>
  <p>&copy; 福岡高校写真部</p>
</footer>

<style>
  @import url("https://fonts.googleapis.com/css2?family=LINE+Seed+JP:wght@400;700&display=swap");

  header {
    border-bottom: 1px solid #ddd;
  }

  :global(*) {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: "LINE Seed JP", sans-serif;
    font-weight: 400;
    font-style: normal;
  }

  :global(body) {
    background: #f3f2ef;
    color: #292825;
  }

  :global(button),
  :global(a) {
    color: #292825;
  }

  :root {
    --border: #888;
    --white: #f8f7f4;
  }

  /* Header */

  header {
    border-bottom: 1px solid var(--border);
  }

  header h1 {
    font-size: clamp(1.2rem, 3vw, 1.5rem);
    letter-spacing: 0.1em;
    text-align: center;
    width: 100%;
    padding: 1.5rem 0;
  }

  /* Main */

  main {
    width: min(1000px, calc(100% - 4rem));
    padding: 2rem 0 8rem;
    margin: 0 auto;
  }

  /* Terms */

  .terms {
    font-size: 1rem;
    background: var(--white);
    width: 100%;
    border: solid var(--border) 1px;
    padding: 1rem 2rem;
    margin: 0 auto 2rem;
  }

  .terms button {
    font: inherit;
    background: none;
    border: 0;
    cursor: pointer;
    width: 100%;
    text-align: center;
    letter-spacing: 0.05em;
  }

  .terms div {
    width: 100%;
    padding: 1rem 0 0;
    margin: 1rem auto 0;
    border-top: solid var(--border) 1px;
  }

  .terms p {
    width: min(800px, calc(100% - 4rem));
    font: inherit;
    margin: 0.5rem auto;
  }

  /* Filter */

  .filters {
    margin-bottom: 4rem;
    font-size: 0.85rem;
    width: 100%;
    letter-spacing: 0.1em;
  }

  .filters label {
    padding: 0 1rem 1rem;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    flex-direction: row;
  }

  .filters select {
    flex-grow: 1;
    padding: 0.5rem;
    margin-left: 1rem;
    border: 1px solid var(--border);
    border-radius: 0;
    background: var(--white);
    font: inherit;
    cursor: pointer;
  }

  .result-count {
    padding: 1rem 1rem 0;
  }

  /* Photos */

  .photos {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5rem 3rem;
  }

  .photos > div {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .photo {
    flex-grow: 1;
    display: flex;
    align-items: center;
  }

  .frame {
    padding: 4px;
    border: solid #333 1px;
  }

  .frame img {
    display: block;
    max-width: 100%;
    max-height: 55vh;
    width: auto;
    height: auto;
    padding: 6px;
    margin: 0;
    border: solid #333 1px;
  }

  .plate {
    display: flex;
    align-items: center;
    width: min(90%, 400px);
    padding: 0.5rem 0.5rem;
    margin-top: 0.8rem;
    border-top: 1px solid #333;
    border-bottom: 1px solid #333;
    font-size: 0.75rem;
    letter-spacing: 0.1em;
  }

  .download {
    flex-grow: 1;
    padding: 0.4rem;
    margin-left: 0.5rem;
    border: solid var(--border) 1px;
    border-radius: 0;
    background: var(--white);
    cursor: pointer;
    font: inherit;
  }

  /* Footer */

  footer {
    border-top: 1px solid var(--border);
    padding: 1.5rem 0;
  }

  footer a {
    display: block;
    width: fit-content;
    padding: 1rem 2rem;
    margin: 0 auto 1rem;
    border: solid var(--border) 1px;
    background: var(--white);
    cursor: pointer;
  }

  footer p {
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-align: center;
    width: 100%;
  }

  /* Mobile */

  @media (max-width: 600px) {
    main {
      width: calc(100% - 2rem);
    }
    .terms {
      padding: 1rem;
    }
    .terms p {
      width: calc(100% - 1rem);
    }
    .filters {
      font-size: 1rem;
    }
    .photos {
      grid-template-columns: 1fr;
    }
    .frame img {
      max-height: 45vh;
    }
    .plate {
      width: min(85%, 400px);
      padding: 0.5rem 1rem;
      font-size: 1rem;
    }
    .download {
      padding: 0.6rem;
    }
  }
</style>
