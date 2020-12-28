import { useState, useEffect } from 'react';
import { RadialChart } from 'react-vis';
import { DiscreteColorLegend } from 'react-vis';

/**
 *
 * @param {This component requires a posts prop to be passed in} props
 */
const GenreRadialChart = (props) => {
  const [tagDistribution, setTagDistribution] = useState([]);

  // This pulls out the like tags into an array of likes for plotting
  useEffect(() => {
    let techCount = 0;
    let houseTag = 0;
    let discoTag = 0;
    let funkTag = 0;
    let dnbTag = 0;
    let electronicTag = 0;
    let rapTag = 0;
    let alternativeTag = 0;
    let indieTag = 0;
    let untagged = 0;
    if (props.posts && props.posts[0]) {
      props.posts.forEach((post) => {
        if (post.data.tags.includes('Techno')) {
          techCount++;
          console.log('techo tag found');
        }
        if (post.data.tags.includes('House')) {
          houseTag++;
        }
        if (post.data.tags.includes('Disco')) {
          discoTag++;
        }
        if (post.data.tags.includes('Funk')) {
          funkTag++;
        }
        if (post.data.tags.includes('DnB')) {
          dnbTag++;
        }
        if (post.data.tags.includes('Electronic')) {
          electronicTag++;
        }
        if (post.data.tags.includes('Rap')) {
          rapTag++;
        }
        if (post.data.tags.includes('Alternative')) {
          alternativeTag++;
        }
        if (post.data.tags.includes('Indie')) {
          indieTag++;
        }
        if (post.data.tags.length == 0) {
          untagged++;
        }
      });
    }
    const tagsArray = [];
    if (techCount > 0) {
      tagsArray.push({
        label: 'Techno',
        angle: techCount,
        radius: 300,
        innerRadius: 200,
      });
    }
    if (houseTag > 0) {
      tagsArray.push({
        label: 'House',
        angle: houseTag,
        radius: 300,
        innerRadius: 200,
      });
    }
    if (discoTag > 0) {
      tagsArray.push({
        label: 'Disco',
        angle: discoTag,
        radius: 300,
        innerRadius: 200,
      });
    }
    if (funkTag > 0) {
      tagsArray.push({
        label: 'Funk',
        angle: funkTag,
        radius: 300,
        innerRadius: 200,
      });
    }
    if (dnbTag > 0) {
      tagsArray.push({
        label: 'DnB',
        angle: dnbTag,
        radius: 300,
        innerRadius: 200,
      });
    }
    if (electronicTag > 0) {
      tagsArray.push({
        label: 'Electronic',
        angle: electronicTag,
        radius: 300,
        innerRadius: 200,
      });
    }
    if (rapTag > 0) {
      tagsArray.push({
        label: 'Rap',
        angle: rapTag,
        radius: 300,
        innerRadius: 200,
      });
    }
    if (alternativeTag > 0) {
      tagsArray.push({
        label: 'Alternative',
        angle: alternativeTag,
        radius: 300,
        innerRadius: 200,
      });
    }
    if (indieTag > 0) {
      tagsArray.push({
        label: 'Indie',
        angle: indieTag,
        radius: 300,
        innerRadius: 200,
      });
    }
    if (untagged > 0) {
      tagsArray.push({
        label: 'Untagged',
        angle: untagged,
        radius: 300,
        innerRadius: 200,
      });
    }
    setTagDistribution(tagsArray);
  }, [props.posts]);

  let chart = <p>No chart yet</p>;
  if (tagDistribution[0]) {
    chart = (
      <RadialChart
        showLabels={true}
        labelsRadiusMultiplier={0.6}
        data={tagDistribution}
        width={400}
        height={400}
        innerRadius="200"
        stroke={'#ddd'}
        strokeWidth={2}
        labelsStyle={{ color: 'red', fontSize: '20px' }}
      />
    );
  } else {
    chart = 'No posts from the selected user';
  }
  return <div>{chart}</div>;
};

export default GenreRadialChart;
